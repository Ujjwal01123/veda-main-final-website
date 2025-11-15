import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
//
// import { ManagePujas } from "./pages/";
import { ViewPuja } from "./pages/ViewPuja";
import EditPuja from "./pages/EditPuja";
import { ViewBooking } from "./pages/ViewBooking";
import { EditBooking } from "./pages/EditBooking";
import { BookingCalendar } from "./pages/BookingCalender";
import { ViewCategory } from "./pages/ViewCategory";
import { EditCategory } from "./pages/EditCategory";
import TotalDevotees from "./pages/totalDevotees";
import { RevenueCalendar } from "./pages/MonthlyRevenue";
import { PujaForm } from "./components/dashboard/PujaForm";
import { CategoryForm } from "./components/dashboard/CategoryForm";
import { ManagePujas } from "./components/dashboard/ManagePujas";
import { ManageCategories } from "./components/dashboard/ManageCategories";
import { ManageBookings } from "./components/dashboard/ManageBookings";
import { ManageActiveBookings } from "./components/dashboard/ActiveBookings";
import { ManageCancelBookings } from "./components/dashboard/CancelBookings";
import { ManageUpcomingPujas } from "./components/dashboard/ManageUpcomingPujas";
import { UploadData } from "./components/dashboard/UploadData";
import AddRudraksha from "./components/dashboard/RudrakshaForm";
import AddBracelet from "@/components/dashboard/BraceletForm";
import { ManageRudraksha } from "./components/dashboard/ManageRudraksha";
import { ManageOrders } from "./components/dashboard/ManageOrders";
import { ManageBracelets } from "./components/dashboard/ManageBracelets";
import { ViewRudraksha } from "./pages/ViewRudraksha";
import EditRudraksha from "./pages/EditRudraksha";
import { ViewBracelet } from "./pages/ViewBracelet";
import EditBracelet from "./pages/EditBracelet";
import Auth from "./components/dashboard/Auth";
import { ManageBlogs } from "./components/dashboard/ManageBlogs";
import BlogForm from "./components/dashboard/BlogForm";
import EditBlogForm from "./pages/EditBlogs";
import { ViewBlog } from "./pages/ViewBlog";
import { DraftsSection } from "./components/dashboard/ManageDraft";
import { ViewRudrakshaDrafts } from "./pages/RudrakshaDraft";
import { ViewPujaDrafts } from "./pages/PujaDraft";
import { ViewBraceletDrafts } from "./pages/BraceletDraft";
import { ViewOrderDrafts } from "./pages/OrderDraft";
import { ViewBlogDrafts } from "./pages/BlogDraft";
import { ViewCategoryDrafts } from "./pages/CategoryDraft";
import { ViewBookingDrafts } from "./pages/BookingDraft";
import { BannerSettings } from "./components/dashboard/ManageBanner";
import { PujaBanner } from "./pages/PujaBanner";
import { AstrologyBanner } from "./pages/AstrologyBanner";
import { RudrakshaBanner } from "./pages/RudrakshaBanner";
import { BraceletBanner } from "./pages/BraceletBanner";
import { BlogBanner } from "./pages/BlogBanner";
import { BannerOptions } from "./components/dashboard/BannerOption";
import { ViewBanners } from "./pages/ViewBanner";
import { PujaBanners } from "./pages/currentPujaBanner";
import { BraceletBanners } from "./pages/currentBraceletBanner";
import { RudrakshaBanners } from "./pages/currentRudrakshaBanners";
import { BlogBanners } from "./pages/currentBlogBanners";
import { AstrologyBanners } from "./pages/currentAstrologyBanners";
import { BannerViewSettings } from "./components/dashboard/ViewBannerSetting";
import ManagePujaForms from "./components/dashboard/manageParticipateBooking";
import ViewPujaForm from "./pages/viewPujaForm";
import EditPujaForm from "./pages/EditParticipatePujaForm";
import { ParticipatedViewPujaDrafts } from "./pages/participatePujaFormDraft";
import ProductDashboard from "./components/dashboard/product/productDashboard";
import ManageProductOrders from "./components/dashboard/ManageProductOrders";
import GemstoneForm from "./components/dashboard/GemstoneForm";
import { ManageGemstone } from "./components/dashboard/ManageGemstone";
import { ProductRevenueCalendar } from "./pages/productRevenueCalender";
import { OfferForm } from "./components/dashboard/offer/offerForm";
import OfferViewPage from "./components/dashboard/offer/viewOffer";
import { RudrakshaOfferForm } from "./components/dashboard/product/rudrakshaOfferForm";
import { BraceletOfferForm } from "./components/dashboard/product/braceletOfferForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard/dashboard" element={<Dashboard />} />
          {/* <Route path="/pujas" element={<ManagePujas />} /> */}
          <Route path="/pujas/view/:id" element={<ViewPuja />} />
          <Route path="/pujas/offers" element={<OfferForm />} />
          <Route path="/pujas/offers" element={<OfferForm />} />
          <Route path="/rudraksha/offers" element={<RudrakshaOfferForm />} />
          <Route path="/bracelet/offers" element={<BraceletOfferForm />} />
          {/* <Route path="/pujas/offers/view/:id" element={<OfferViewPage />} /> */}
          <Route path="/pujas/edit/:id" element={<EditPuja />} />
          {/*  */}
          <Route path="/blogs/view/:id" element={<ViewBlog />} />
          <Route path="/blogs/edit/:id" element={<EditBlogForm />} />
          <Route path="/dashboard/manage-blogs" element={<ManageBlogs />} />
          <Route
            path="/dashboard/manage-puja-forms"
            element={<ManagePujaForms />}
          />
          <Route path="/puja/forms/view/:id" element={<ViewPujaForm />} />
          <Route path="/puja/forms/edit/:id" element={<EditPujaForm />} />
          <Route path="/dashboard/manage-draft" element={<DraftsSection />} />
          <Route path="/dashboard/add-blog" element={<BlogForm />} />
          {/*  */}
          {/* bookings routes */}
          <Route path="/bookings/view/:id" element={<ViewBooking />} />
          <Route path="/bookings/edit/:id" element={<EditBooking />} />
          {/*  */}
          <Route path="/dashboard/calender" element={<BookingCalendar />} />
          {/*  */}
          <Route path="/drafts/rudraksha" element={<ViewRudrakshaDrafts />} />
          <Route path="/drafts/puja" element={<ViewPujaDrafts />} />
          <Route
            path="/drafts/pujaForms"
            element={<ParticipatedViewPujaDrafts />}
          />
          <Route path="/drafts/bracelet" element={<ViewBraceletDrafts />} />
          <Route path="/drafts/orders" element={<ViewOrderDrafts />} />
          <Route path="/drafts/blogs" element={<ViewBlogDrafts />} />
          <Route path="/drafts/categories" element={<ViewCategoryDrafts />} />
          <Route path="/drafts/bookings" element={<ViewBookingDrafts />} />
          {/*  */}
          <Route path="/dashboard/total-devotees" element={<TotalDevotees />} />
          {/*  */}
          <Route
            path="/dashboard/total-revenue"
            element={<RevenueCalendar />}
          />
          <Route
            path="/dashboard/total-product-revenue"
            element={<ProductRevenueCalendar />}
          />
          {/*  */}
          <Route path="/categories/view/:id" element={<ViewCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          {/*  */}
          <Route path="/dashboard/add-puja" element={<PujaForm />} />
          <Route path="/dashboard/add-rudraksha" element={<AddRudraksha />} />
          <Route path="/rudraksha/view/:id" element={<ViewRudraksha />} />
          <Route path="/rudraksha/edit/:id" element={<EditRudraksha />} />
          <Route path="/dashboard/add-bracelet" element={<AddBracelet />} />
          <Route path="/dashboard/add-category" element={<CategoryForm />} />
          <Route path="/dashboard/add-gemstone" element={<GemstoneForm />} />
          <Route path="/dashboard/manage" element={<ManagePujas />} />
          <Route
            path="/dashboard/manage-gemstones"
            element={<ManageGemstone />}
          />

          {/*  */}

          <Route path="/banners/view" element={<BannerViewSettings />} />
          <Route path="/banners/view/puja" element={<PujaBanners />} />
          <Route path="/banners/view/bracelet" element={<BraceletBanners />} />
          <Route
            path="/banners/view/rudraksha"
            element={<RudrakshaBanners />}
          />
          <Route path="/banners/view/blog" element={<BlogBanners />} />
          <Route
            path="/banners/view/astrology"
            element={<AstrologyBanners />}
          />
          <Route path="/banners/puja" element={<PujaBanner />} />
          <Route path="/banners/astrology" element={<AstrologyBanner />} />
          <Route path="/banners/rudraksha" element={<RudrakshaBanner />} />
          <Route path="/banners/bracelet" element={<BraceletBanner />} />
          <Route path="/banners/blog" element={<BlogBanner />} />

          {/*  */}
          <Route
            path="/dashboard/manage-banners"
            element={<BannerSettings />}
          />
          <Route path="/dashboard/banner-options" element={<BannerOptions />} />
          <Route
            path="/dashboard/manage-rudraksha"
            element={<ManageRudraksha />}
          />
          <Route path="/bracelet/view/:id" element={<ViewBracelet />} />
          <Route path="/bracelet/edit/:id" element={<EditBracelet />} />

          <Route path="/dashboard/manage-orders" element={<ManageOrders />} />
          <Route
            path="/dashboard/manage-bracelets"
            element={<ManageBracelets />}
          />
          <Route
            path="/dashboard/manage-categories"
            element={<ManageCategories />}
          />
          <Route
            path="/dashboard/manage-bookings"
            element={<ManageBookings />}
          />
          <Route path="/dashboard/active" element={<ManageActiveBookings />} />
          <Route path="/dashboard/cancel" element={<ManageCancelBookings />} />
          <Route
            path="/dashboard/manage-upcoming"
            element={<ManageUpcomingPujas />}
          />
          <Route path="/dashboard/upload" element={<UploadData />} />
          {/* product section */}
          {/* {/* <Route path="/dashboard/product" element={<ProductDashboard/>} /> */}
          <Route path="/dashboard/product" element={<ProductDashboard />} />
          <Route
            path="/dashboard/manage-product-orders"
            element={<ManageProductOrders />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
