import getLisitings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({searchParams}: HomeProps) => {

   const listings = await getLisitings(searchParams);
   const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6
      "
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing}  currentUser={currentUser}/>
        ))}
      </div>
    </Container>
  );
}

export default Home;
