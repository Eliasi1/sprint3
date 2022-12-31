const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { BookIndex } from "./apps/book/views/book-index.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"
import { BookEdit } from "./apps/book/views/book-edit.jsx"

export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/mail/:filterBy" element={<MailIndex />} />
                <Route element={<BookIndex />} path='/book'></Route>
                <Route element={<BookEdit />} path='/book/edit'></Route>
                <Route element={<BookDetails />} path='/book/:bookId'></Route>
            </Routes>
            <UserMsg />
            <div onClick={() => document.body.classList.remove('menu-open')} className="overlay menu-overlay full"></div>
        </section>
    </Router>
}
