'use server'
import { prisma } from "@/app/libs/prismadb";

export interface IListingParams {
  userId: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
export default async function getLisitings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

const generateObjectId = () => {
  return [...Array(24)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}
    const query = {
      category: "",
      userId: generateObjectId(),
      roomCount: {},
      guestCount: {},
      bathroomCount: {},
      locationValue: {},
      NOT: {},
    };

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
               startDate: {lte: endDate},
               endDate: {gte: endDate}
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
}
