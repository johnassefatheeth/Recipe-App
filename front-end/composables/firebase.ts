// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage ,ref ,uploadString ,getDownloadURL,getMetadata} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ9ljv1_sfxUz3zmPFPSiFbANHy-pisho",
  authDomain: "food-images-9ff08.firebaseapp.com",
  projectId: "food-images-9ff08",
  storageBucket: "food-images-9ff08.appspot.com",
  messagingSenderId: "350211157802",
  appId: "1:350211157802:web:139c3afe5005ba1f36b853"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const savefile = async (fullpath,file)=>{
    const imagesRef =ref(storage, fullpath);
    const snapshot = await uploadString(imagesRef, file, 'data_url');

    if(snapshot){
        const DownloadURL = await getDownloadURL(snapshot.ref);
        const metadata= await getMetadata(snapshot.ref);
        //console.log(snapshot,DownloadURL,metadata)
        return {snapshot,DownloadURL,metadata}
    }
}

export const uploadFile = async (file)=>{
    return await new Promise(function (resolve, reject) {
        var reader =new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
            const result =reader.result;

            const {snapshot, DownloadURL , metadata}= await savefile('images/'+file.name,result);
            
            if (snapshot){
                resolve({snapshot,DownloadURL,metadata});
            }else{
                reject();
            }
        }
    })
}

