describe('Check for customer experience', () => {
  it.only('check all the components are visible', () => {
    cy.visit('/')
    cy.get('[data-testid=loading]').should('be.visible')
    cy.get('body').then(($body) => {
      if ($body.find('root').length > 0) {
        cy.get('[data-testid=image-select]').should('be.visible')
        cy.get('[data-testid=default-image]').should('be.visible')
        cy.get('[data-testid=image-thumbnail-Road]').should('be.visible')
        cy.get('[data-testid=image-thumbnail-Mountain]').should('be.visible')
        cy.get('[data-testid=image-thumbnail-Beach]').should('be.visible')
      }
    })
  })
  it.only('check the user can select different images using the thumbnail', () => {
    cy.visit('/')
    cy.get('[data-testid=loading]').should('be.visible')
    cy.get('body').then(($body) => {
      if ($body.find('root').length > 0) {
        cy.get('[data-testid=image-thumbnail-Road]').as('thumbnailRoad')
        cy.get('[data-testid=image-thumbnail-Mountain]').as('thumbnailMountain')
        cy.get('[data-testid=image-thumbnail-Beach]').as('thumbnailBeach')
        cy.get('[data-testid=default-image]').as('defaultImage')
        cy.get('@thumbnailRoad').should('be.visible')
        cy.get('@thumbnailMountain').should('be.visible')
        cy.get('@thumbnailBeach').should('be.visible')
        cy.get('@defaultImage').should('be.visible')
        cy.get('@thumbnailMountain').click()
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655815211-mountain-naked.jpg?auto=format&h=1400&w=1400')
        cy.get('@thumbnailBeach').click()
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655822607-beach-naked.jpg?auto=format&h=1400&w=1400')
        cy.get('@thumbnailRoad').click()
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655827671-road-naked.jpg?auto=format&h=1400&w=1400')
      }
    })
  })
  it.only('check the user can select different images from dropdown', () => {
    cy.visit('/')
    cy.get('[data-testid=loading]').should('be.visible')
    cy.get('body').then(($body) => {
      if ($body.find('root').length > 0) {
        cy.get('[data-testid=image-select]').as('selectImage')
        cy.get('[data-testid=default-image]').as('defaultImage')
        cy.get('@selectImage').should('be.visible')
        cy.get('@defaultImage').should('be.visible')
        cy.get('@selectImage').select('8ko blue')
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655827698-road-8blue.jpg?auto=format&h=1400&w=1400')
        cy.get('@selectImage').select('8ko brown')
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655827713-road-8brown.jpg?auto=format&h=1400&w=1400')
        cy.get('@selectImage').select('4ko fire')
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655828691-road-nfire.jpg?auto=format&h=1400&w=1400')
        cy.get('@selectImage').select('4kop smoke')
        cy.get('@defaultImage').should('have.attr', 'src', 'https://www.datocms-assets.com/45158/1655829249-road-psmoke.jpg?auto=format&h=1400&w=1400')
      }
    })
  })
})