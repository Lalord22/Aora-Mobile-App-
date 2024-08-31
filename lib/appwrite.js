import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';


export const config = {

    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.lalo.aora",
    projectId:"66d2658f002c04867c36",
    databaseId:"66d266dd002295f39383",
    userCollectionId:"66d2670f001f97ac85e0",
    videoCollectionId:"66d2674400069d9c170b",
    storageId:"66d2686700131478bfac",

}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export async function createUser(email, password, username) {
        try {
          const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
          );
      
          if (!newAccount) throw Error;
      
          const avatarUrl = avatars.getInitials(username);
      
          await signIn(email, password);
      
          const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl,
            }
          );
      
          return newUser;
        } catch (error) {
          throw new Error(error);
        }
      }
      
      // Sign In
      export async function signIn(email, password) {
        try {
          const session = await account.createEmailPasswordSession(email, password);
      
          return session;
        } catch (error) {
          throw new Error(error);
        }
      }
      


