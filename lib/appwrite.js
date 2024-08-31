import { Client, Account, ID } from 'react-native-appwrite';

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

    export const createUser = () => {

        // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

    }


