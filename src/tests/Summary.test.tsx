import { render, screen } from "@testing-library/react";
import Summary from "../components/formPages/Summary";
import { faker } from "@faker-js/faker";

const fakeData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  emailAdress: faker.internet.email(),
  fullPriceTickets: faker.datatype.number({ min: 0, max: 8 }).toString(),
  reducedPriceTickets: faker.datatype.number({ min: 0, max: 8 }).toString(),
};

describe("Summary component", () => {
  it("renders correctly and displays provided data", () => {
    render(<Summary {...fakeData} />);
    expect(screen.getByText(fakeData.firstName, { exact: false }));
    expect(screen.getByText(fakeData.lastName, { exact: false }));
    expect(screen.getByText(fakeData.emailAdress, { exact: false }));
    if (fakeData.fullPriceTickets !== "0") {
      expect(
        screen.getAllByText(`${+fakeData.fullPriceTickets} full price`, {
          exact: false,
        })
      );
    }
    if (fakeData.reducedPriceTickets !== "0") {
      expect(
        screen.getAllByText(`${+fakeData.reducedPriceTickets} reduced price`, {
          exact: false,
        })
      );
    }
  });
});
