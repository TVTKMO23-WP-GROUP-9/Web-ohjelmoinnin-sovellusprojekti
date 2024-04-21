*** Settings ***
Library    RequestsLibrary
Library    DateTime
Library    Collections
Library    Process
Library    BuiltIn
Library    SeleniumLibrary
Suite Setup    Open Browser To Login Page
Suite Teardown    Close Browser
Variables    variables.py

*** Test Cases ***
Valid register
    Give Username    Robottitesti
    Give Email    robotti@testi.fi
    Give Password    robottipw
    Sleep    2 seconds
    Submit Registeration Form
    Sleep    1 seconds
    Then Login

Valid Login
    Input Username    Robottitesti
    Input Password    robottipw
    Sleep    2 seconds
    Submit Credentials
    Sleep    1 seconds
    Account Info Page Should Be Open

Navigate to Community
    Click Link Community
    Sleep    3 seconds

Create Group
    Sleep    3 seconds
    Press Button Create New Group
    Sleep    1 seconds
    Input Group Name    ${GROUPNAME}
    Sleep    1 seconds
    Press Button Create Group
    Sleep    3 seconds

Navigate to MyAccount
    Sleep    3 seconds
    Click Link MyAccount
    Sleep    3 seconds

Delete Account
    Sleep    2 seconds
    Press Button Delete
    Sleep    1 seconds
    Press Button Confirm Delete
    Sleep    10 seconds

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Title Should Be    Leffaysi

Give Username
    [Arguments]    ${username}
    Input Text    id:robot04    ${username}

Give Email
    [Arguments]    ${email}
    Input Text    id:robot05    ${email}

Give Password
    [Arguments]    ${password}
    Input Text    id:robot06    ${password}

Submit Registeration Form
    Click Button    id:robot07

Then Login
    Title Should Be    Leffaysi

Input Username
    [Arguments]    ${username}
    Input Text    id:robot01    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    id:robot02    ${password}

Submit Credentials
    Click Button    id:robot03

Account Info Page Should Be Open
    Title Should Be    Leffaysi

Press Button Delete
    Click Button    id:robot01

Press Button Confirm Delete
    Click Button    id:robot02

Click Link Community   
    Click Link    id:link01

Click Link MyAccount   
    Click Link    id:link02

Click Link Profile
    Click Link    id:link03

Press Button Create New Group
    Click Button    id:robot01

Input Group Name
    [Arguments]    ${groupname}
    Input Text    id:robot03    ${groupname}

Press Button Create Group
    Click Button    id:robot02
