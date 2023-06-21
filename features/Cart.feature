Feature: Cart

  @IntegrationTests
  Scenario: Add items to the cart
    Given I navigate 'test' to login page
    And I enter username 'standard_user'
    And I enter password 'secret_sauce'
    When I click login button
    Then I will be navigated to home page
    Then I click on the 'Add to cart'
    Then I click on the 'Add to cart'
    Then I click on the 'Add to cart'
    Then I click on the 'Add to cart'
    Then the user should see 4 items in the cart
