const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"



export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>

            <Routes>
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/inbox" element={<MailIndex />} />
                <Route path="/mail/sent" element={<MailIndex />} />
                <Route path="/mail/starred" element={<MailIndex />} />
                <Route path="/mail/draft" element={<MailIndex />} />
            </Routes>

        </section>
    </Router>
}
