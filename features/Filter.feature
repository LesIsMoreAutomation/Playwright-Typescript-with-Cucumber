Feature: Filter Items

  @RegressionTests
  Scenario: Filter items by pricing
    Given I navigate 'test' to login page
    And I enter username 'standard_user'
    And I enter password 'secret_sauce'
    When I click login button
    Then I will be navigated to home page
    When the user filters items by pricing
    Then the user should see the first item as the lowest and the last item as the highest in price
