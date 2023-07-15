Feature: Office Login feature

  As a user I should be able to login with valid credentials on microsoft office

  @smoke
  Scenario: Should be able to login with valid credentials on microsoft office
    Given I navigate 'office' to login page
    Then I click on a 'Sign in'
    Then I enter my username 'lesibana.george@gmail.com'
    When I click on a 'Next'
    Then I enter my password 'TestWebDriverIO?'
    When I click on a 'Sign in'
