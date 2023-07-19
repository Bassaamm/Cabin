import supabase from "./supabase";

export async function login({ email, password }) {
  console.log(email, password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("wrong data");
  }
  return data;
}

export async function signUpUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  console.log(data);
  if (error) console.log(error);
  return data;
}
export async function getExistUser() {
  const { data: userSession } = await supabase.auth.getSession();
  if (!userSession.session) return null;

  const { data: userAcc, error } = await supabase.auth.getUser();
  console.log(userAcc);
  if (error) return console.log(error);
  return userAcc?.user;
}

export async function updateUser({ password, fullName, avatar }) {
  //Update the use data
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
  }

  // if there is no avatar ben uploded return else upload avatar
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadAvatarError) {
    console.log(uploadAvatarError);
    throw new Error();
  }

  //use the avatar after it been uploaded to the bucket
  const { error: updateUserError, data: userAvatar } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `https://rjmukoixbhqupqdspqyr.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    }
  );
  if (updateUserError) {
    console.log(updateUserError);
    throw new Error();
  }

  return userAvatar;
}

export async function logOutApiAuth() {
  const { error } = await supabase.auth.signOut();

  if (error) console.log(error);
}
