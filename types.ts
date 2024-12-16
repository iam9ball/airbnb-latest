import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeUser =
  | (Omit<User, "createdAt" | "emailVerified" | "updatedAt"> & {
      createdAt: string;
      emailVerified: string | null;
      updatedAt: string;
    })
  | null;

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "endDate" | "startDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
