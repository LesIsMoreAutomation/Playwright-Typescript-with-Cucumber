Feature: Testing ultimate automation sign in page

  @smoke
  Scenario: This test is to test ultimate automation sign in
    Given I navigate to ultimate automation website 'qa'
    Then Assert sign in page has header 'Welcome Back!'
    When I enter the email 'test@testing1.co.za'
    And I enter the password 'WelcomeBack!'
    Then I click on the sign in button
