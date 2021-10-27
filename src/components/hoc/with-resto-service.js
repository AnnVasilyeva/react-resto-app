import React from 'react';
import RestoServiceContext from '../resto-service-context';

// WithRestoService компонент высшего порядка и принимает какой-то компонент (Wrapped) и все его аргументы (props). И этот компонент со всем его содержимым мы сразу рендерим внутри Consumer, тем самым избавляемся от лишнего повторения кода.
const WithRestoService = () => (Wrapped) => {
    return (props) => {
        return (
           <RestoServiceContext.Consumer>
                {/* RestoService это контекст из RestoServiceContext*/}
               {
                   (RestoService) => {
                       return <Wrapped {...props} Restoservice={RestoService}/>
                   }
               }
           </RestoServiceContext.Consumer> 
        )
    }
};

export default WithRestoService;