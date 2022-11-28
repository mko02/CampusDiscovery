import React from "react";

import * as Styled from "./NavBar.styled";

export function NavBar(){
    return (<Styled.Container>
        <a href="/#/dashboard"><Styled.Tab>Dashboard</Styled.Tab></a>
        <a href="/#/map"><Styled.Tab>Map</Styled.Tab></a>
        <a href="/#/filter"><Styled.Tab>Filter & Sort</Styled.Tab></a>
    </Styled.Container>
    );
}