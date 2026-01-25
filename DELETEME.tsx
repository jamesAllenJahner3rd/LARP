// import { get } from 'http';
// import React, { useEffect, useState, useCallback, memo, useMemo, useRef } from 'react';


// function SearchUsers() {
//     // useEffect(()=>{},[])
//     // const aCallback = useCallback ( ()=>{},[])
//     // cant memo = useMemo(function,[])
//     const [query, setQuery] = useState<string>('');
//     const requestCount = useRef<number>(0);
//     const [loading, setLoading] = useState<boolean>(false);
//     const requestedUsers = useMemo(() => query.toLowerCase().trim().split(" "), [query])
//     const getUsers = useCallback(async function fetchUsers(userlist: string[]): promises<void> {
//         setLoading(true);
//         const index = requestCount.current + 1;
//         requestCount.current = index;
//         try {
//             const response = await fetch("https://jsonplaceholder.typicode.com/users")
//             if (index !== requestCount.current) {
//                 const abort = new AbortController();
//                 abort.abort(response)
//                 return

//             };
//             const data = await response.json();
//             const gatheredUsers = data.filter((user) => userlist.includes(user.name.toLowerCase().trim()))
//         } catch (error) {
//             if (error !== "AbortError") {
//                 console.error("failed to fetch users", error)
//             } else {

//             }
//         }
//     }, [requestCount])
//     useEffect(() => {
//         if (!query) return;
//         const timeout = setTimeout(() => getUsers(requestedUsers), 500);



//         return () => clearTimeout(timeout)



//     }, [requestedUsers, query])



//     return (
//         <fieldset>
//             <label htmlFor="search">Search Users:</label>
//             <input type='text' name="search" onChange={(event) => setQuery(event.target.value)} />
//         </fieldset>
//     )
// }
// // export default memo(SearchUsers);

// import React, {
//     useMemo, useRef, useState, useCallback,
//     useEffect

// } from "react"
//useEffect(()=>{},[])
// const afunctExpress = useCallback(()={},[])
// const memo = useMemo(()=>{}), [])
//const  [a, setA] = useState()

// function UserTable() {

//     // fetch  from a table
//     // Try/ catch block
//     // What needs a guard?
//     // grab 3 users per page? so ech fetch will grab the next  3 users
//     // meaning i have to keep track of where i am
//     //
//     type User = {
//         id: string;
//         name: string;
//         company: Company;
//         email: string;
//     }
//     type Company = {
//         id: string;
//         name: string;
//         address: string;
//         metadate: any;
//     }
//     const pageSize = 3
//     const userlist = useRef<User[]>([])
//     const [page, setPage] = useState(0)
//     const users = useMemo<User[]>(() => (userlist.current.slice(page * pageSize, (page * pageSize) + pageSize)), [page, pageSize])
//     const [theBeginning, setTheBeginning] = useState(true)
//     const [theEnd, setTheEnd] = useState(false)
//     const [loading, setLoading] = useState<boolean>(false)

//     const turnPage = useCallback((index: number) => {
//         setPage(index);
//         index === 0 ? setTheBeginning(true) : setTheBeginning(false);
//         index * pageSize + pageSize >= userlist.current.length ? setTheEnd(true) : setTheEnd(false);
//     }
//         , [pageSize])

//     useEffect(() => {
//         const fetchUsers = async () => {

//             try {
//                 setLoading(true)
//                 const response = await fetch("jsonplaceholder.typicode.com/users")
//                 if (!response.ok) {
//                     console.error("Unable to retrieve a response.")// How's this error?
//                 }
//                 const data = await response.json()
//                 userlist.current = [...data]

//             } catch (error) {
//                 console.error(error, " - Failed to load")

//             } finally { setLoading(false) }
//         }
//         fetchUsers()
//     }, [])

//     return (
//         <>
//             {/* A table with columns:name /email / company */}
//             {loading ? <span>Loading...</span> :
//                 <table>
//                     <thead>
//                         <tr >
//                             <th scope="col">Name</th><th scope="col">Email</th ><th scope="col">Company</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.company.name}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             }

//             <div>
//                 {!theBeginning && <button onClick={() => turnPage(page - 1)}>Previous</button>}
//                 {!theEnd && <button onClick={() => turnPage(page + 1)}>Next</button>}
//             </div>

//             {/* “Next” and “Previous” buttons ; Buttons disabled at boundaries*/}
//             {/* loading while fetching */}
//             {/*- “Failed to load” on error  */}
//         </>
//     )
// }
// export default React.memo(UserTable)



/**You’re asked to build a component called DynamicForm that:
- Renders a list of input fields based on a config array (e.g. [{label:"Name", type:"text"}, {label:"Age", type:"number"}]).
- Tracks all field values in state.
- Validates each field:
- Required fields cannot be empty.
- Number fields must be positive.
- Shows inline error messages under each invalid field.
- On submit, logs the collected values if valid, otherwise highlights errors.
 */
// import React, { useCallback, useState } from "react"

// function DynamicForm(): React.JSX.Element {
//     // const [bbbbb,set] = useState<>()
//     const [name, setName] = useState<string>("")
//     const [age, setAge] = useState<number>(0)
//     // const validForm = useMemo(()=>return{},[])
//     // const submitHandler = useCallback(callback, deps)

//     // }
//     return (
//         <>
//             <fieldset>
//                 <label htmlFor="Name">Name:</label>
//                 <input type='text' name="Name" onChange={(event) => setName(event.target.value)} />
//                 <label htmlFor="Age">Age:</label>
//                 <input type="number" name="Age" onChange={(event) => setAge(+event.target.value)} />
//             </fieldset>
//         </>
//     )
// }
// export default React.memo(DynamicForm)