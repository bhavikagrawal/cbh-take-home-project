# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1

**Title**: Assign custom identifier for Agent\
**Description**: Facilities would like to assign custom ids for their agent instead of dabase driven unique \id. This must be unique for an agent assigned to a Facility.
**Estimate**: 12hr\
**Acceptance Criteria**: No two agent in same facility can have same custom id.\
**Implementation Detail**:
- create a table AgencyAgent to hold agencyId(reference key), agent customId, agenct id(Reference key) with composite key(agencyId,agent customId)
- update modal and ORM to access newly genrated reference.
- create api to add/update entry in AgencyAgent
- unit testing for add/update api

## Ticket 2

**Title**: Update getShiftsByFacility to return agent meta data with custom id\
**Description**: get all shifts for a facility with agent meta data to have agent custom id provided by Facility\
**Estimate**: 6hr\
**Acceptance Criteria**: getShiftsByFacility to return agent custom id with each shift detail\
**Implementation Detail**:
- get agent custom ids from AgencyAgent table based on agency id and agent id.
- getShiftDetail will return agent custom id along with old agent meta data
- unit testing to check for presence of agent custom id
**Dependent On**: Ticket 1

## Ticket 3

**Title**: Update generateReport to use custom id instead of agent id\
**Description**: generateReport should create PDF using new custom Agent id if available.\
**Estimate**: 1hr\
**Acceptance Criteria**: PDF should reflect new custom agent id if available.\
**Implementation Detail**:
- have a check to use custom id instead of agent id if avaialable.
- unit testing to check for presence of agent custom id in pdf
