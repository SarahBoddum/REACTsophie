// Kræver installation "npm install --save react-firebase-hooks"
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export default function Admin1Page() {
    const [nummer, setNummer] = useState('');
    const [navn, setNavn] = useState ('');
    const [ingredienser, setIngredienser] = useState ('');
    const [pris, setPris] = useState ('');
    const [status, setStatus] = useState ('');

    const userInSession = sessionStorage.getItem('user');
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    function handleSubmit(e) {
        e.preventDefault();
        const url = "https://pizzaproject-74794-default-rtdb.europe-west1.firebasedatabase.app/pizza.json";

        const formData = {
            nummer: nummer,
            navn: navn,
            ingredienser: ingredienser,
            pris: pris 
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fejl ved gemning af formulardata');
            }
            setStatus('Pizza gemt i Firebase Realtime Database.')
        })
        .catch((error) => {
            setStatus('Fejl ved gemning af formulardata:', error)
        })
    }
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
      }, [user, loading, navigate]);

    async function handleLogout() {
        try {
            await signOut(auth);
            sessionStorage.removeItem('user');
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="page">
            <h1>Admin 1 side</h1>
            <h2>Opret ny pizza</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nummer:
                    <input type="number" value={nummer} name="nummer" onChange={(e) => setNummer(e.target.value)} required />
                </label>
                <br />
                <label>
                    Navn:
                    <input type="text" value={navn} name="navn" onChange={(e) => setNavn(e.target.value)} required />
                </label>
                <br />
                <label>
                    INgredienser:
                    <input type="text" value={ingredienser} name="ingredienser" onChange={(e) => setIngredienser(e.target.value)} required />
                </label>
                <br />
                <label>
                    Pris:
                    <input type="number" value={pris} name="pris" onChange={(e) => setPris(e.target.value)} required />
                </label>
                <br />
                {status}
                <button type="submit">Opret</button>
            </form>

            <p>Du er logget på som {userInSession && user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </section>
    )

}
