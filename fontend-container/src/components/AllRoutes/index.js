

    import React from 'react';
    import { useRoutes } from 'react-router-dom';
    import routes from '../../routes/index.js';
    const AllRoutes = () => {

        const ele = useRoutes(routes);
        return (
            <>
            
                {ele}
            </> 
        );
    }

    export default AllRoutes;