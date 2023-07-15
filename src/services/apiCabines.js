import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabiens() {
  let { data: cabin, error } = await supabase.from("cabin").select("*");

  if (error) console.error(error);

  return cabin;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabin").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error();
  }
}

export async function insertAndEditCabin(CabinData, id) {
  const imgName = `${Math.random()}-${CabinData.image.name}`.replaceAll(
    "/",
    ""
  );
  const hasAlreadyUrl = CabinData?.image?.startsWith?.(supabaseUrl);
  const imgUrl = hasAlreadyUrl
    ? CabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;
  let query = supabase.from("cabin");
  if (!id) {
    query = query.insert([{ ...CabinData, image: imgUrl }]);
  }
  if (id) {
    query = query.update({ ...CabinData, image: imgUrl }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) return console.log(error);
  const { error: BucketError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, CabinData.image);
  if (BucketError) {
    console.log(BucketError);
    const { error } = await supabase.from("cabin").delete().eq("id", data.id);
  }
  return data;
}
