import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pizzakort from "../components/Pizzakort";

export default function PizzaPlace() {

   const [posts, setPosts] = useState([]);

   const [isPosts, setIsPosts] = useState(true);

   useEffect(() =>{
    async function getPosts() {
        const url = "https://pizzaproject-74794-default-rtdb.europe-west1.firebasedatabase.app/pizza.json";

        const response = await fetch(url);

        const data = await response.json();
        if (data !== null) {
            const postsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setPosts(postsArray)
        } else {
            setIsPosts(false);
        }
    } 
    getPosts(false);
   }, []);
   //ternary operator: en react if/else statement - består af fx isPost ? efterfulgt af : og så else sætningen
   return (
    <section className="page">
        <h1>Pizzas</h1> 
        {isPosts ? (
            <form>
                {posts.map((pizzaobject) => (
                    <Pizzakort key={pizzaobject.id} pizza={pizzaobject} />
                ))}
            </form>
        ) : (
            <p>Ingen pizzaer at vise</p>
        )}
        <p><Link to="/login">Login</Link></p>
    </section>
   )
}