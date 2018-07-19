<?php 
	
remove_filter( 'pre_term_description', 'wp_filter_kses' );
remove_filter( 'pre_link_description', 'wp_filter_kses' );
remove_filter( 'pre_link_notes', 'wp_filter_kses' );
remove_filter( 'term_description', 'wp_kses_data' );

include('wp-api-lanauva.php');

function beneficios_constructMetaQuery($params){

   $meta_query = array(
        'relation' => 'AND'    
    );

	if(isset($params["title"])){
    	   $meta_query["nombre_del_establecimiento_clause"] = array(
        	            'key'        => 'nombre_del_establecimiento',
            	        'value'        => $params["title"],
                	    'compare'    => 'LIKE'
                	);
   }

	if(isset($params["comunidad"])){
    	   $meta_query["comunidad_autonoma"] = array(
        	            'key'        => 'comunidad_autonoma',
            	        'value'        => $params["comunidad"],
                	    'compare'    => 'LIKE'
                	);
   }

   $tax_query  = array(
       'relation' => 'AND'    
   );

   if(isset($params["categoria_del_beneficio"])){
       $tax_query[] = array(
                       'taxonomy' => 'categoria_del_beneficio',
                       'field' => 'ID',
                       'terms' => $params["categoria_del_beneficio"],
                   );
   }
   
   if(isset($params["localidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'localidad',
                       'field' => 'ID',
                       'terms' => $params["localidad"],
               );
   }
    
    return array(
               'meta_query' => $meta_query,
                'tax_query' => $tax_query,
            );
}

function ofertas_online_constructMetaQuery($params){

   $meta_query = array(
        'relation' => 'AND'    
    );

	if(isset($params["title"])){
    	   $meta_query["nombre_del_establecimiento_clause"] = array(
        	            'key'        => 'nombre_del_establecimiento',
            	        'value'        => $params["title"],
                	    'compare'    => 'LIKE'
                	);
   }
   
    $tax_query  = array(
        'relation' => 'AND'    
    );
   
    if(isset($params["categoria_de_la_oferta"])){
        $tax_query[] = array(
                        'taxonomy' => 'categoria_del_beneficio',
                        'field' => 'ID',
                        'terms' => $params["categoria_de_la_oferta"],
                    );
    }
    
    return array(
               'meta_query' => $meta_query,
                'tax_query' => $tax_query,
            );
}

function ofertas_grandes_marc_constructMetaQuery($params){

   $meta_query = array(
        'relation' => 'AND'    
    );

	if(isset($params["title"])){
    	   $meta_query["nombre_del_establecimiento_clause"] = array(
        	            'key'        => 'nombre_del_establecimiento',
            	        'value'        => $params["title"],
                	    'compare'    => 'LIKE'
                	);
   }

	if(isset($params["comunidad"])){
    	   $meta_query["comunidad_autonoma"] = array(
        	            'key'        => 'comunidad_autonoma',
            	        'value'        => $params["comunidad"],
                	    'compare'    => 'LIKE'
                	);
   }

   $tax_query  = array(
       'relation' => 'AND'    
   );

   if(isset($params["categoria_de_la_oferta_grande_marc"])){
       $tax_query[] = array(
                       'taxonomy' => 'categoria_del_beneficio',
                       'field' => 'ID',
                       'terms' => $params["categoria_de_la_oferta_grande_marc"],
                   );
   }
   
   if(isset($params["localidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'localidad',
                       'field' => 'ID',
                       'terms' => $params["localidad"],
               );
   }
   
   if(isset($params["marca"])){
       $tax_query[] = array(
                       'taxonomy' => 'marca',
                       'field' => 'ID',
                       'terms' => $params["marca"],
               );
   }
    
    return array(
               'meta_query' => $meta_query,
                'tax_query' => $tax_query,
            );
}

function of_gr_m_ca_constructMetaQuery($params){

    $meta_query = array(
         'relation' => 'AND'    
     );
 
     if(isset($params["title"])){
            $meta_query["nombre_del_establecimiento_clause"] = array(
                         'key'        => 'nombre_del_establecimiento',
                         'value'        => $params["title"],
                         'compare'    => 'LIKE'
                     );
    }
 
     if(isset($params["comunidad"])){
            $meta_query["comunidad_autonoma"] = array(
                         'key'        => 'comunidad_autonoma',
                         'value'        => $params["comunidad"],
                         'compare'    => 'LIKE'
                     );
    }
 
    $tax_query  = array(
        'relation' => 'AND'    
    );
 
    if(isset($params["categoria_de_la_of_gr_m_ca"])){
        $tax_query[] = array(
                        'taxonomy' => 'categoria_del_beneficio',
                        'field' => 'ID',
                        'terms' => $params["categoria_de_la_of_gr_m_ca"],
                    );
    }
    
    if(isset($params["localidad"])){
        $tax_query[] = array(
                        'taxonomy' => 'localidad',
                        'field' => 'ID',
                        'terms' => $params["localidad"],
                );
    }
    
    if(isset($params["marca"])){
        $tax_query[] = array(
                        'taxonomy' => 'marca',
                        'field' => 'ID',
                        'terms' => $params["marca"],
                );
    }
     
     return array(
                'meta_query' => $meta_query,
                 'tax_query' => $tax_query,
             );
 }

function prestaciones_constructMetaQuery($params){

   $meta_query = array(
        'relation' => 'AND'    
    );

	if(isset($params["nombre"])){
    	   $meta_query["nombre_de_la_prestacion_clause"] = array(
        	            'key'        => 'nombre_de_la_prestacion',
            	        'value'        => $params["nombre"],
                	    'compare'    => 'LIKE'
                	);
   }

	if(isset($params["nivel"])){
    	   $meta_query["nivel_administrativo_de_la_prestacion_publica_clause"] = array(
        	            'key'        => 'nivel_administrativo_de_la_prestacion_publica',
            	        'value'        => $params["nivel"],
                	    'compare'    => 'LIKE'
                	);
   }

   $tax_query  = array(
       'relation' => 'AND'    
   );

   if(isset($params["categorias_de_la_prestacion"])){
       $tax_query[] = array(
                       'taxonomy' => 'categorias_de_la_prestacion',
                       'field' => 'ID',
                       'terms' => $params["categorias_de_la_prestacion"],
                   );
   }
   
   if(isset($params["localidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'localidad',
                       'field' => 'ID',
                       'terms' => $params["localidad"],
               );
   }
   
   if(isset($params["comunidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'comunidad',
                       'field' => 'ID',
                       'terms' => $params["comunidad"],
               );
   }
    
    return array(
               'meta_query' => $meta_query,
                'tax_query' => $tax_query,
            );
}


function getCategorias(WP_REST_Request $request){
	$categorias = get_terms( 'categoria_del_beneficio', array(
		'hide_empty' => true,
	) );
	$categorias_filtered = array_map('categoria_del_beneficio_basic',$categorias);
    return new WP_REST_Response( $categorias_filtered );
}


function getCategoriasDeLaPrestacion(WP_REST_Request $request){
	$categoriasdelaprestacion = get_terms( 'categorias_de_la_prestacion', array(
		'hide_empty' => true,
	) );
	$categoriasdelaprestacion_filtered = array_map('categorias_de_la_prestacion_basic',$categoriasdelaprestacion);
    return new WP_REST_Response( $categoriasdelaprestacion_filtered );
}

function getCategoriasDeLaOfertaOnline(WP_REST_Request $request){
	$categoriasdelaofertaonline = get_terms( 'categoria_del_beneficio', array(
		'hide_empty' => true,
	) );
	$categoriasdelaofertaonline_filtered = array_map('categoria_de_la_oferta_basic',$categoriasdelaofertaonline);
    return new WP_REST_Response( $categoriasdelaofertaonline_filtered );
}

function getCategoriasDeLaGrandeMarc(WP_REST_Request $request){
	$categoriasdelagrandemarc = get_terms( 'categoria_del_beneficio', array(
		'hide_empty' => true,
	) );
	$categoriasdelagrandemarc_filtered = array_map('categoria_de_la_oferta_grande_marc_basic',$categoriasdelagrandemarc);
    return new WP_REST_Response( $categoriasdelagrandemarc_filtered );
}

function getCategoriasDeLaGrandeMarcCa(WP_REST_Request $request){
	$categoriasdelagrandemarcca = get_terms( 'categoria_del_beneficio', array(
		'hide_empty' => true,
	) );
	$categoriasdelagrandemarcca_filtered = array_map('categoria_de_la_of_gr_m_ca_basic',$categoriasdelagrandemarcca);
    return new WP_REST_Response( $categoriasdelagrandemarcca_filtered );
}

function getLocalidades(WP_REST_Request $request){
	$localidades = get_terms( 'localidad', array(
		'hide_empty' => true,
	) );
	$localidades_filtered = array_map('localidad_basic',$localidades);
    return new WP_REST_Response( $localidades_filtered );
}

function getComunidades(WP_REST_Request $request){
	$comunidades = get_terms( 'comunidad', array(
		'hide_empty' => true,
	) );
	$comunidades_filtered = array_map('comunidad_basic',$comunidades);
    return new WP_REST_Response( $comunidades_filtered );
}


function getMarcas(WP_REST_Request $request){
	$marcas = get_terms( 'marca', array(
		'hide_empty' => true,
	) );
	$marcas_filtered = array_map('marca_basic',$marcas);
    return new WP_REST_Response( $marcas_filtered );
}


function getMarca(WP_REST_Request $request){
    $route = $request->get_route();
	$route_parts = explode("/",$route);
    $id = intval(array_pop($route_parts));
	$marcas = get_terms( 'marca', array(
        'term_taxonomy_id' => $id
	) );
	$marcas_filtered = array_map('marca_basic',$marcas);
    return new WP_REST_Response( array_pop($marcas_filtered) );
}


function categoria_del_beneficio_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


function categorias_de_la_prestacion_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


function categoria_de_la_oferta_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


function categoria_de_la_oferta_grande_marc_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


function categoria_de_la_of_gr_m_ca_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


function marca_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}

function localidad_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}

function comunidad_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}

function beneficios_nameIdSlugLatLonCategoria($fields){
    
        return array(
            "name" => $fields["name"],
            "ID" => $fields["ID"],
            "slug" => $fields['slug'],
            "lat" => $fields['lat'],
            "lon" => $fields['lon'],
            "categoria_de_la_prestacion" => $fields["categoria_de_la_prestacion"]
        );
}

function ofertas_grandes_marc_nameIdSlugLatLonMarca($fields){
    
        return array(
            "name" => $fields["name"],
            "ID" => $fields["ID"],
            "slug" => $fields['slug'],
            "lat" => $fields['lat'],
            "lon" => $fields['lon'],
            "marca" => $fields["marca"]
        );
}

function of_gr_m_ca_nameIdSlugLatLonMarca($fields){
    
        return array(
            "name" => $fields["name"],
            "ID" => $fields["ID"],
            "slug" => $fields['slug'],
            "lat" => $fields['lat'],
            "lon" => $fields['lon'],
            "marca" => $fields["marca"]
        );
}

function of_gr_m_ca_idMarca($fields){
    
        return array(
            "ID" => $fields["ID"],
            "marca" => $fields["marca"]
        );
}

function of_gr_m_ca_idMarcaComunidad($fields){
    
        return array(
            "ID" => $fields["ID"],
            "marca" => $fields["marca"],
            "comunidad_autonoma" => $fields["comunidad_autonoma"]
        );
}

function ofertas_grandes_marc_nameIdSlugDescripcion_de_la_ofertaMarca($fields){
    
        return array(
            "name" => $fields["name"],
            "ID" => $fields["ID"],
            "slug" => $fields['slug'],
            "descripcion_de_la_oferta" => $fields
            ['descripcion_de_la_oferta'],
            "marca" => $fields["marca"]
        );
}

function of_gr_m_ca_nameIdSlugDescripcion_de_la_ofertaMarca($fields){
    
        return array(
            "name" => $fields["name"],
            "ID" => $fields["ID"],
            "slug" => $fields['slug'],
            "descripcion_de_la_oferta" => $fields
            ['descripcion_de_la_oferta'],
            "marca" => $fields["marca"]
        );
}

function beneficios_localidadCategoria($fields){
    
        return array(
            "localidad_del_beneficio" => $fields["localidad_del_beneficio"],
            "categoria_de_la_prestacion" => $fields["categoria_de_la_prestacion"]
        );
}

function beneficios_localidad($fields){
    
        return array(
            "localidad_del_beneficio" => $fields["localidad_del_beneficio"]
        );
}

function beneficios_comunidad($fields){
    
        return array(
            "comunidad_autonoma" => $fields["comunidad_autonoma"]
        );
}


add_action( 'rest_api_init', function () {

	register_rest_route(
			'lanauva/v1', 
			'/categoria_del_beneficio', 
			array(
				'methods' => 'GET',
				'callback' => 'getCategorias',
			)
		);
    
    register_rest_route(
			'lanauva/v1', 
			'/localidad', 
			array(
				'methods' => 'GET',
				'callback' => 'getLocalidades',
			)
		);
    
    register_rest_route(
			'lanauva/v1', 
			'/comunidad', 
			array(
				'methods' => 'GET',
				'callback' => 'getComunidades',
			)
		);
    
    register_rest_route(
			'lanauva/v1', 
			'/categorias_de_la_prestacion', 
			array(
				'methods' => 'GET',
				'callback' => 'getCategoriasDeLaPrestacion',
			)
		);
        
    register_rest_route(
            'lanauva/v1',
            '/categoria_de_la_oferta', 
            array(
                'methods' => 'GET',
                'callback' => 'getCategoriasDeLaOfertaOnline',
            )
        );
        
    register_rest_route(
            'lanauva/v1', 
            '/categoria_de_la_oferta_grande_marc', 
            array(
                'methods' => 'GET',
                'callback' => 'getCategoriasDeLaGrandeMarc',
            )
        );
        
    register_rest_route(
            'lanauva/v1', 
            '/categoria_de_la_of_gr_m_ca', 
            array(
                'methods' => 'GET',
                'callback' => 'getCategoriasDeLaGrandeMarcCa',
            )
        );
        
    register_rest_route(
            'lanauva/v1', 
            '/marca', 
            array(
                'methods' => 'GET',
                'callback' => 'getMarcas',
            )
        );
        
    register_rest_route(
            'lanauva/v1', 
            '/marca/(?P<id>\d+)', 
            array(
                'methods' => 'GET',
                'callback' => 'getMarca',
            )
        );

} );

?>