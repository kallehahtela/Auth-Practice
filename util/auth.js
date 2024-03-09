import axios from "axios";

const API_KEY = 'AIzaSyCj7cLbuBYXzKv7NU0a2_ZzEB-ltvf3wLU'

async function Authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });

    //console.log(response.data);
}

export async function createUser(email, password) {
    await Authenticate('signUp', email, password);
}

export async function Login(email, password) {
    await Authenticate('signInWithPassword', email, password);
}