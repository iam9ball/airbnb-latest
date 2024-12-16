import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import PropertyClient from "./PropertiesClient";
import getLisitings from "../actions/getListings";

const PropertiesPage
 = async () => {
      const currentUser = await getCurrentUser();

      if(!currentUser) {
        return (
         <EmptyState
         title="Unauthorized"
         subtitle="Please login"
         />
        )
      }

      const listings = await getLisitings({
        userId: currentUser.id
      });

      if (listings.length == 0) {
        return (
          <EmptyState
            title="No properties found"
            subtitle="Looks like you haven't properties"
          />
        );
        
      }
      return <PropertyClient listings={listings} currentUser={currentUser} />;
}

export default PropertiesPage
