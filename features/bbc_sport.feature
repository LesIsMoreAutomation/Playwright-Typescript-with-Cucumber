Feature: BBC Sport Automation

  @IntegrationTests
  Scenario: Validation In A Table Of Results
    Given I navigate 'bbcSport' to login page
    Then I click on the link text "Formula"
    And I click on the link text "Results"
    And I click on the link text "2023"
    And I click on the "Abu Dhabi Grand Prix"
    And I click on the "Las Vegas Grand Prix"
    Then I should see "Max Verstappen" in '1' place
    And I should see "Charles Leclerc" in '2' place
    And I should see "Sergio Perez" in '3' place

  @IntegrationTests
  Scenario: Retrieve Search Results
    Given I navigate 'bbcSport' to login page
    When I search for "Sport in 2023"
    Then I assert that "2023" appears at least four times
