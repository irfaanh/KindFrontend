import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {persistStore} from 'redux-persist'
import { store } from './Redux/store.js';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"
import Router from './Router/Router.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'))
    let persister = persistStore(store)
    root.render(
        <Provider store={store}>
            <PersistGate persistor={persister}>
                <Router/>
            </PersistGate>
        </Provider>
    )
    
