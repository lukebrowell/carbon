import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Table, TableCell } from './../table';
import TableRow from './table-row';
import Icon from './../../icon';

describe('TableRow', () => {
  let instance, clickableInstance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo">
          <TableCell />
        </TableRow>
      </Table>
    );

    clickableInstance = TestUtils.renderIntoDocument(
      <Table>
        <TableRow className="foo" onClick={ function() {}}>
          <TableCell />
        </TableRow>
      </Table>
    );
  });

  it('renders a tr with correct classes', () => {
    let tr = TestUtils.findRenderedDOMComponentWithTag(instance, 'tr');
    expect(tr).toBeDefined();
    expect(tr.className).toEqual('ui-table-row foo');
  });

  describe('if the row is clickable', () => {
    it('adds a clickable class', () => {
      let tr = TestUtils.findRenderedDOMComponentWithTag(clickableInstance, 'tr');
      expect(tr.className).toMatch('ui-table-row--clickable');
    });
  });

  describe('other props', () => {
    it('consumes other props on the tr element', () => {
      let spy = jasmine.createSpy();

      instance = TestUtils.renderIntoDocument(
        <Table>
          <TableRow className="foo" onClick={ spy }>
            <TableCell />
          </TableRow>
        </Table>
      );

      let tr = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-table-row');
      TestUtils.Simulate.click(tr);
      expect(spy).toHaveBeenCalled();
    });
  });
});