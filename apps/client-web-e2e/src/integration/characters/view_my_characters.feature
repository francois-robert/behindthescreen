Feature: View my characters

Scenario: No characters
    Given I am logged as "fredisgreat"
    When I click on the "Personnages" link
    Then I should see "Vous n'avez pas encore de personnages"

