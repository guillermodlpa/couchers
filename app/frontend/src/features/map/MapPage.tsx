import { makeStyles } from "@material-ui/core";
import { LngLat, Map as MaplibreMap } from "maplibre-gl";
import { useHistory, useLocation } from "react-router-dom";

import { placeRoute, userRoute } from "../../AppRoutes";
import Map from "../../components/Map";
import PageTitle from "../../components/PageTitle";
import { addClusteredUsersToMap } from "./clusteredUsers";
import { addCommunitiesToMap } from "./communities";
import { addPagesToMap } from "./pages";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    height: "80vh",
    border: "1px solid black",
  },
}));

export default function MapPage() {
  const history = useHistory();

  const location = useLocation();

  const classes = useStyles();

  const handlePageClick = (ev: any) => {
    const pageId = ev.features[0].properties.id;
    // TODO: slug, guide/place/etc
    history.push(`${placeRoute}/${pageId}`, location.state);
  };

  const handleClick = (ev: any) => {
    const username = ev.features[0].properties.username;
    history.push(`${userRoute}/${username}`, location.state);
  };

  const initializeMap = (map: MaplibreMap) => {
    map.on("load", () => {
      addCommunitiesToMap(map);
      addPagesToMap(map, handlePageClick);
      addClusteredUsersToMap(map, handleClick);
    });
  };

  return (
    <>
      <PageTitle>MapPage</PageTitle>
      <Map
        initialZoom={1}
        initialCenter={new LngLat(0, 0)}
        grow
        postMapInitialize={initializeMap}
        className={classes.root}
      />
    </>
  );
}
