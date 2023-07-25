// queries.js
import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunches {
    launches {
      id
      mission_name
      launch_date_utc
      links {
        flickr_images
      }
    }
  }
`;
