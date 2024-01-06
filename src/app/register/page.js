export default function RegisterPage(){
    return (
        <section className="mt-8">
            <h1 className="font-semibold text-center text-red-600 text-4xl">Register</h1>
            <form className="mt-4 block max-w-xs mx-auto">
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button>Login with google</button>
            </form>
        </section>
    );
}