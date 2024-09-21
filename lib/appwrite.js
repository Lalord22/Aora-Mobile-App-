import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";


export const appwriteappwriteConfig = {

    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.lalo.aora",
    projectId:"66d2658f002c04867c36",
    databaseId:"66d266dd002295f39383",
    userCollectionId:"66d2670f001f97ac85e0",
    videoCollectionId:"66d2674400069d9c170b",
    storageId:"66d2686700131478bfac",

}

const{ endpoint, platform, projectId, databaseId, userCollectionId, 
    videoCollectionId, storageId
  } = appwriteappwriteConfig;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteappwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteappwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteappwriteConfig.platform) // Your application ID or bundle ID.

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
            appwriteappwriteConfig.databaseId,
            appwriteappwriteConfig.userCollectionId,
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
      export const signIn = async (email, password) =>{
        try {
          const session = await account.createEmailPasswordSession(email, password);
      
          return session;
        } catch (error) {
          throw new Error(error);
        }
      }

      export async function getAllPosts() {
        try {
          const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
          );
      
          return posts.documents;
        } catch (error) {
          throw new Error(error);
        }
      }

      export async function getAccount() {
        try {
          const currentAccount = await account.get();
      
          return currentAccount;
        } catch (error) {
          throw new Error(error);
        }
      }

      export async function getCurrentUser() {
        try {
          const currentAccount = await getAccount();
          if (!currentAccount) throw Error;
      
          const currentUser = await databases.listDocuments(
            appwriteappwriteConfig.databaseId,
            appwriteappwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
          );
      
          if (!currentUser) throw Error;
      
          return currentUser.documents[0];
        } catch (error) {
          console.log(error);
          return null;
        }
      }


      
      


