import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripPage = async () => {
      const currentUser = await getCurrentUser();

      if(!currentUser) {
        return (
         <EmptyState
         title="Unauthorized"
         subtitle="Please login"
         />
        )
      }

      const reservations = await getReservation({
        userId: currentUser.id
      });

      if (reservations.length == 0) {
        return (
            <EmptyState 
            title="No trips found"
            subtitle="Looks like you haven't reserved any trips"
            />
        )
         
        
      }

      return (
        <TripsClient reservations={reservations} currentUser={currentUser} />
      );
}

export default TripPage