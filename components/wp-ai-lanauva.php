<?php

// WP API Lanauva Tools
///////////////////////

function getCollection($args, $filter_response_fields = NULL){

	$posts = array();
	$the_query = new WP_Query( $args );

	if( $the_query->have_posts() ):
		while( $the_query->have_posts() ) : $the_query->the_post();

			global $post;
    		$slug = $post->post_name;

			$post_fields = get_fields();
			$post_fields["ID"] = get_the_ID();
			$post_fields["slug"] = $post->post_name;
			$post_fields["name"] = html_entity_decode(get_the_title());
			$post_fields["large_text"] = get_the_content();

            if(isset($filter_response_fields)){
                $post_fields = $filter_response_fields($post_fields);
                if($post_fields!=NULL){
                    $posts[]=$post_fields;    
                }
            }else{
                $posts[]=$post_fields;
            }

		endwhile;
	endif;

	wp_reset_query();

	return $posts;
}


function getElement($args, $filter_response_fields = NULL){

	$post_fields = array();
	$the_query = new WP_Query( $args );
	if( $the_query->have_posts() ):
		$the_query->the_post();

		global $post;

		$post_fields = get_fields();
		$post_fields["name"] = html_entity_decode(get_the_title());
    	$post_fields['slug'] = $post->post_name;
		$post_fields["large_text"] = get_the_content();

		if(isset($filter_response_fields)){
			$post_fields = $filter_response_fields($post_fields);
		}

	endif;

	wp_reset_query();

	return $post_fields;
}


function constructMetaQuery($params){

	$meta_query = array();
	$meta_query['relation'] = 'AND';
	foreach($params as $param_name => $param_value){

        if($param_name!="sim-model"){

            $meta_query[$param_name_."_clause"] = array(
                'key'		=> $param_name,
                'value'		=> $param_value,
                'compare'	=> '='
            );
        }
	}

	return array( 'meta_query' => $meta_query );
}

function constructOrderBy($params){
    return array("name"=>"ASC");
}


function getCollectionRESTResponse(WP_REST_Request $request, $filter_args = NULL, $filter_result = NULL, $filter_response_fields = NULL ){

	$route = $request->get_route();
	$type = end(explode("/",$route));

    $camelCaseType = dashesToCamelCase($type);

	//Seleccionem la construcció de la query per defecte o la que haguem definit pel custom post type
	$constructMetaQueryFunc = function_exists( $camelCaseType.'_constructMetaQuery') ? $camelCaseType.'_constructMetaQuery' : 'constructMetaQuery';
    $constructOrderByFunc = function_exists( $camelCaseType.'_constructOrderBy') ? $camelCaseType.'_constructOrderBy' : 'constructOrderBy';

    list($meta_key,$orderby) = $constructOrderByFunc( $request->get_params() );

	$args = array(
		'post_type'		=> $type,
		'numberposts'	=> -1,
        'posts_per_page' => -1,
		//'meta_query'	=> $constructMetaQueryFunc( $request->get_params() ),
        'meta_key'      => $meta_key,
        'orderby'       => $orderby,
	);

    $args = array_merge($args, $constructMetaQueryFunc( $request->get_params() ));

	//return new WP_REST_Response( $args );

    if(isset($filter_args)){
		$args = $filter_args($args);
	}

    if( $filter_response_fields==NULL ){
       $filter_response_fields = getSIMmodelFilterFunc($camelCaseType,$request->get_param('sim-model'));
    }

	$posts = getCollection( $args, $filter_response_fields );

    $filter_model_resum = getSIMmodelGlobalFilterFunc($camelCaseType,$request->get_param('sim-model'));
    if($filter_model_resum!=NULL){
        $filter_result = $filter_model_resum;
    }
    if(isset($filter_result)){
		$posts = $filter_result($posts);
	}

	//return new WP_REST_Response( array_merge( array($args) ,$posts) );
	return new WP_REST_Response( $posts );
}


function getElementRESTResponse(WP_REST_Request $request, $filter_args = NULL, $filter_response_fields = NULL ){

	$route = $request->get_route();
	$route_parts = explode("/",$route);
	$id = intval(array_pop($route_parts));	
	$type = array_pop($route_parts);

    $camelCaseType = dashesToCamelCase($type);

	$args = array(
		'post_type'		=> $type,
		'p'				=> $id,
		'numberposts'	=> 1
	);

	if(isset($filter_args)){
		$args = $filter_args($args);
	}

    if( $filter_response_fields==NULL ){
        $filter_response_fields = getSIMmodelFilterFunc($camelCaseType,$request->get_param('sim-model'));
    }

	$post = getElement( $args, $filter_response_fields );

	return new WP_REST_Response( $post );
}

function dashesToCamelCase($string, $capitalizeFirstCharacter = false) {

    $str = str_replace('-', '', ucwords($string, '-'));

    if (!$capitalizeFirstCharacter) {
        $str = lcfirst($str);
    }

    return $str;
}

function getSIMmodelFilterFunc($type,$simModel){

    if( $simModel == NULL ){
        return NULL;
    }
    
    $simModelFuncName = $type."_".dashesToCamelCase($simModel);

    return function_exists( $simModelFuncName ) ? $simModelFuncName : NULL;    
}

function getSIMmodelGlobalFilterFunc($type,$simModel){

    if( $simModel == NULL ){
        return NULL;
    }
    
    $simModelFuncName = $type."_".dashesToCamelCase($simModel)."_globalFilter";

    return function_exists( $simModelFuncName ) ? $simModelFuncName : NULL;    
}


add_action( 'rest_api_init', function () {

	$post_types = get_post_types(
						array(
							'public'   => true,
							'_builtin' => false
						), 
						'objects' 
					);

	foreach ( $post_types  as $post_type ) {

		//Collection endpoint
		register_rest_route(
			'lanauva/v1', 
			'/'.$post_type->name, 
			array(
				'methods' => 'GET',
				'callback' => 'getCollectionRESTResponse',
			)
		);

		//Element endpoint
		register_rest_route(
			'lanauva/v1', 
			'/'.$post_type->name.'/(?P<id>\d+)', 
			array(
				'methods' => 'GET',
				'callback' => 'getElementRESTResponse',
			)
		);
	}



} );

?>