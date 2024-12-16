import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationClient from "../components/ReservationClient";

export const dynamic = "force-dynamic";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservation({
    authorId: currentUser?.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }
  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationPage;
