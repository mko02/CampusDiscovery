import React, { Component } from "react";
import * as Styled from "./Account.styled";

export function Account(){
        return (
            <div>
                <h1>This is the account page!!</h1>
                <p>Log in or register here</p>
                <form>
                    <label>
                        Username:
                        <input type="text" name="name" />
                    </label>
                    <p></p>
                    <label>
                        Password:
                        <input type="text" name="name" />
                    </label>
                    <p></p>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )

}