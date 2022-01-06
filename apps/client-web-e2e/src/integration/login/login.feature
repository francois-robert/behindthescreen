Feature: Login

Scenario: Display login form
    Given I am on the "/" page
    When I click on the "login" button
    Then I should see the "login" form

Scenario: Login successful
    Given I am on the "/" page
    When I click on the "login" button
     And I fill "email" with "fredisgreat@test.com"
     And I fill "password" with "strongpwd"
     And I click on the "signin" button
    Then I should be on the "/" page
     And I should see the account menu

