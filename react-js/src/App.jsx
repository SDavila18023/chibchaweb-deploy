import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { AppLayout } from "./components/Layouts/AppLayout"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/Session/LoginPage.jsx"
import { RegisterPage } from "./pages/Session/RegisterPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { AccountPage } from "./pages/AccountPage"
import { TicketsPage } from "./pages/Tickets/TicketsPage.jsx"
import { FooterLayout } from "./components/Layouts/FooterLayout"
import { PlansPage } from "./pages/Pay/PlansPage"
import { PayPage } from "./pages/Pay/PayPage"
import { DomainPage } from "./pages/DomainPage"
import { AuthRoute } from "./components/Auth/AuthRoute.jsx";
import { ConfirmPage } from "./pages/Pay/ConfirmPage.jsx";
import { ManagementUserPage } from "./pages/ManagementUserPage.jsx";
import { SeeTicketsPage } from "./pages/Tickets/SeeTicketsPage.jsx"
import { StaffTicketsPage } from "./pages/Tickets/StaffTicketsPage.jsx"
import { ManagementAllocationPage } from "./pages/Tickets/ManagementAllocationPage.jsx"
import { AllocationTicketspage } from "./pages/Tickets/AllocationTicketsPage.jsx"
import { RegisterDomainPage } from "./pages/RegisterDomainPage.jsx"
import { UserTicketsPage } from "./pages/Tickets/UserTicketsPage.jsx";
import { TicketNode } from "./pages/Tickets/TicketNode.jsx";

const App = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route element={<FooterLayout />}>
                <Route index element={<HomePage />} />
                <Route element={<AuthRoute to="/" role={[4, 5]} />}>
                    <Route path="account" element={<AccountPage />} />
                    <Route path="tickets" element={<TicketsPage />} />
                    <Route path="domains" element={<DomainPage />} />
                    <Route path="confirm/:id" element={<ConfirmPage />} />
                    <Route path="pay/:id" element={<PayPage />} />
                    <Route path="usertickets" element={<UserTicketsPage />} />
                    <Route path="ticket/:id" element={<TicketNode />} />
                </Route>
                <Route element={<AuthRoute to="/" role={1} />}>
                    <Route path="managementuser" element={<ManagementUserPage />} />
                </Route>
                <Route element={<AuthRoute to="/" role={[1, 2]} />}>
                    <Route path="managementallocation" element={<ManagementAllocationPage />} />
                    <Route path="allocationtickets" element={<AllocationTicketspage />} />
                </Route>
                <Route element={<AuthRoute to="/" role={[1, 3]} />}>
                    <Route path="assignedtickets" element={<StaffTicketsPage />} />
                </Route>
                <Route element={<AuthRoute to="/" role={[1, 2, 3]} />}>
                    <Route path="see" element={<SeeTicketsPage />} />
                </Route>
                <Route path="plans" element={<PlansPage />} />
                <Route path="test" element={<RegisterDomainPage />} />
            </Route>
            <Route element={<FooterLayout hasFooter={false} />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    ))

    return <RouterProvider router={router} />
}

export default App