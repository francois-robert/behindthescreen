Feature: View my characters

Scenario: No characters
    Given I am logged in with user "fredisgreat"
    When I visit the "/characters" page
    Then I should see "Vous n'avez pas encore de personnages"

