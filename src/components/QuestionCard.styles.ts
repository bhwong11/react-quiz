import styled from "styled-components";
import { boolean } from "yargs";

export const Wrapper = styled.div`
    max-width: 1100px;
    backgroundL #ebfeff;
    border-radius:10px;
    border: 2px solid #0085a3;
    padding: 20px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
    text-align:center;

    p{
        font-size:1rem;
    }
`

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
    userResponse:boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    :hover{
        opacity:${({userResponse})=>userResponse?'1':'0.5'};
    }

    button{
        cursor:pointer;
        user-select:none;
        font-size:0.8rem;
        width:100%;
        height: 40px;
        margin: 5px 0;
        background:${({correct, userClicked})=>
            correct
                ? 'green'
                :!correct && userClicked
                ?'red'
                :'#C8CC92'};
                border: 3px solid #ffffff;
                border-radius: 10px;
                color: #FFFAFA;
    }
`