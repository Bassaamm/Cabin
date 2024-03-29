import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { SIZE_FIT_PER_PAGE } from "../utils/constants";

export async function getAllBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("* , cabin(name) , guest(fullName , email)", { count: "exact" });

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.order === "asc",
    });
  if (page) {
    const from = (page - 1) * SIZE_FIT_PER_PAGE;
    const to = from + (SIZE_FIT_PER_PAGE - 1);
    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) console.error(error);

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabin(*), guest(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guest(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
//Could query all the bookings and filter here with a condition like this
// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
//BUT IT'S NOT GOOD BECAUSE WE DON'T NEED ALLL THE DATA AND IT'S NOT A GOOD PRACTICE ONLY QUERY THE DATA YOU NEED.
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guest(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");
  //THE QUERY UP HERE WILL PICK ONE OF THE TRY CONDITION IN THE OR FUNCTION PROVIDED BY SUPABASE  WICH WILL BE EITHER UNCONFIRMED OR CHECKED-IN..  DATABASE 101 COURSE IS PAYING OFF WHEN IT COMES TO UNDERSTAND SQL CODE :))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
