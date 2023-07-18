import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import PersonalInformationPage from "../components/AccountManageField";

function AccountManagePage() {
    return (
        <div style={{ backgroundColor: "#F5F5F9 " }}>
        <Header/>
        <TitleBox buttonText= "Account Management" />
        <PersonalInformationPage />
        <Footer />
        </div>
    );
}

export default AccountManagePage;