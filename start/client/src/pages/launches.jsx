import React, { Fragment, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { LaunchTile, Header, Button, Loading } from '../components';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';




export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launches = () => {
  const { data, loading, error } = useQuery(GET_LAUNCHES);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
    </Fragment>
  );
};



export default Launches;

