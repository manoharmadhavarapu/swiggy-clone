import {useRouteError} from 'react-router-dom';

// useRouteError --> which returns an error object. Gives some extra information
const Error = (props) => {

    const error = useRouteError();

  return (
    <div>
        <h1>Oops!!!!</h1>
        <h2>Something went wrong {props.data}</h2>
        <h3>{error.status} : {error.statusText}</h3>
    </div>
  )
}

export default Error