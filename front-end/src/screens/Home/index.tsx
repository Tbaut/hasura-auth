import React from 'react';

import { useLatestPostsQuery } from '../../generated/graphql';
import Home from './Home';

export default () => {

	const { data, error, loading } = useLatestPostsQuery();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error || !data) {
		return <div>ERROR</div>;
	}

	return <Home data={data} />;
};