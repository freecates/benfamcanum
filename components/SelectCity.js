import { useState } from 'react';

const SelectCity = ({ ruta, options, inputClass, inputClass2, localBenefit, inputValue }) => {
  const elements = options;
  const [selecteValue, setSelectedValue] = useState(options[Object.keys(options)[0]].value);
  // console.log('select city selected options', selecteValue);

  const handleSubmit = event => {
    window.location.href = selecteValue;
    event.preventDefault();
  };

  const renderedElements = elements.map(element => {
    return (
      <option value={element.value} key={element.value}>
        {element.label}
      </option>
    );
  });

  return (
    <form onSubmit={handleSubmit} className={inputClass == 'benefit' && 'benefit'}>
      {inputClass == 'city' ? (
        <label className="city">
          <select
            className="city"
            onChange={event =>
              setSelectedValue(event.target.options[event.target.selectedIndex].value)
            }
          >
            {' '}
            <React.Fragment>
              {ruta.includes('/ca-ES') && <option disabled>Escull població</option>}
              {ruta.indexOf('/ca-ES') == -1 && <option disabled>Escoge población</option>}
            </React.Fragment>
            {renderedElements}
          </select>
        </label>
      ) : (
        ''
      )}
      {inputClass == 'comunidad' ? (
        <label className="city">
          <select
            className="city"
            onChange={event =>
              setSelectedValue(event.target.options[event.target.selectedIndex].value)
            }
          >
            <React.Fragment>
              {ruta.includes('/ca-ES') && <option>Escull CA</option>}
              {ruta.indexOf('/ca-ES') == -1 && <option>Elige CA</option>}
            </React.Fragment>
            {renderedElements}
          </select>
        </label>
      ) : (
        ''
      )}
      {inputClass == 'map' ? (
        <label className="map">
          <select
            className="map"
            onChange={event =>
              setSelectedValue(event.target.options[event.target.selectedIndex].value)
            }
          >
            {renderedElements}
          </select>
        </label>
      ) : (
        ''
      )}
      {inputClass == 'benefit' ? (
        <label className="benefit">
          {localBenefit == true ? (
            <React.Fragment>
              {ruta.includes('/ca-ES') && <h4>Selecciona el municipi</h4>}
              {ruta.indexOf('/ca-ES') == -1 && <h4>Selecciona el municipio</h4>}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {ruta.includes('/ca-ES') && <h4>Selecciona la comunitat municipi</h4>}
              {ruta.indexOf('/ca-ES') == -1 && <h4>Selecciona la comunidad</h4>}
            </React.Fragment>
          )}
          <select
            className="benefit"
            onChange={event =>
              setSelectedValue(event.target.options[event.target.selectedIndex].value)
            }
          >
            {renderedElements}
          </select>
        </label>
      ) : (
        ''
      )}
      <div className="wrapper">
        {(inputClass == 'city' && inputClass2 == null) ||
        (inputClass == 'comunidad' && inputClass2 == null) ? (
          <input className="button city" type="submit" value={inputValue} />
        ) : (
          ''
        )}
        {inputClass == 'city' && inputClass2 == 'green' ? (
          <input className="button city green" type="submit" value={inputValue} />
        ) : (
          ''
        )}
        {inputClass == 'comunidad' && inputClass2 == 'green' ? (
          <input className="button city green" type="submit" value={inputValue} />
        ) : (
          ''
        )}
        {inputClass == 'map' ? (
          <input className="button map" type="submit" value="Buscar por localidad" />
        ) : (
          ''
        )}
        {inputClass == 'benefit' ? (
          <input className="button benefit" type="submit" value={inputValue} />
        ) : (
          ''
        )}
      </div>
      <style jsx>{`
        .wrapper,
        label.map {
          width: 100%;
        }
        label.city {
          width: 100%;
        }
        form.benefit {
          padding: 2em;
          background: #333333;
          border-radius: 6.5%;
        }
        label.benefit {
          text-align: center;
          color: #ffffff;
        }
        input[type='submit'],
        select.map {
          margin: 0 auto;
          display: block;
        }
        select.city {
          margin: 0.7em auto;
          display: block;
        }
        @media screen and (min-width: 768px) {
          input[type='submit'].map,
          input[type='submit'].benefit,
          select.map,
          select.city {
            width: 55%;
          }
        }
        input[type='submit'].city {
          background: #d86525;
        }
        input[type='submit'].city:hover {
          background: #aa4e1c;
        }
        input[type='submit'].city.green {
          background: #007950;
        }
        input[type='submit'].city.green:hover {
          background: #009966;
        }
        input[type='submit'].map {
          background: #009933;
        }
        input[type='submit'].map:hover {
          background: #00862c;
        }
        input[type='submit'].benefit {
          background: #cc3366;
        }
        input[type='submit'].benefit:hover {
          background: #a62953;
        }
      `}</style>
    </form>
  );
};

export default SelectCity;
