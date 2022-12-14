import React from "react";

import * as Styled from "./NavBar.styled";

export function NavBar(){
    return (<Styled.Container>
        <a href="/#/account"><Styled.Tab>Account</Styled.Tab></a>
        <a href="/#/dashboard"><Styled.Tab>Dashboard</Styled.Tab></a>
        <a href="/#/map"><Styled.Tab>Map</Styled.Tab></a>
        <a href="/#/filter"><Styled.Tab>Sort & Filter</Styled.Tab></a>
    </Styled.Container>
    );
}