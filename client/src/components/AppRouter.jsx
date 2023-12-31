import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../main';
import { authRoutes, publicRoutes } from '../routes/routes';
import { AUTHORIZATION_ROUTE, PAYMENTS_ROUTE } from '../routes/consts';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
	const { user } = useContext(Context);

	return (
		<Routes>
      {publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}

			{user.isAuth &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}

      {user.isAuth && <Route path="*" element={<Navigate to={PAYMENTS_ROUTE} />}/>}
      
			{!user.isAuth && <Route path="*" element={<Navigate to={AUTHORIZATION_ROUTE} />}/>}
		</Routes>
	);
});

export default AppRouter;
