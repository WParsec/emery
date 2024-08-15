interface AddUserToDatabaseProps {
  email: string;
  userUid: string;
}

export const AddUserToDatabase = async ({
  userUid,
  email,
}: AddUserToDatabaseProps) => {
  console.log(
    `Adding user with uid ${userUid} with email ${email} to database`
  );
};
