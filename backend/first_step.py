import requests, bs4, webbrowser
from instagram_distributions.models import Distribution, Varyant
from datetime import datetime

headers = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"}

def url_to_text(url):
  try:
    get_request = requests.get(url, headers=headers)
  except:
    print('Something went wrong')
  else:
    return bs4.BeautifulSoup(get_request.text, 'html.parser')

def create_dataset():

  number = 1
  while len(Distribution.objects.all()) < 10:
    distributions_list_url = f'https://www.apkmirror.com/uploads/page/{number}/?appcategory=instagram-instagram'
    
    distributions_soup = url_to_text(distributions_list_url) # get html as bs4
    # get main div include instagram distributions
    widget = bs4.BeautifulSoup(str(distributions_soup.select('.widget_appmanager_recentpostswidget')), 'html.parser')
    # get rows of main div
    all_table_rows = widget.find_all(class_='table-row')

    # loop for each rows
    for _distribution_row in all_table_rows:
      if len(Distribution.objects.all()) < 10:
        # ['Instagram', '268.0.0.0.53', 'alpha', 'by', 'Instagram', '2', 'variants', 'January', '24,', '2023', 'January', '24,', '2023']
        row_values = _distribution_row.get_text().split() 
        # cancel apha and beta versions
        if row_values[2] == 'alpha' or row_values[2] == 'beta':
          continue

        # Format release date
        release_date = "-".join(map(str,
          [row_values[-1], # Year
          datetime.strptime(row_values[-3], '%B').month, # Month
          row_values[-2][:-1]] # Day
        ))

        # Create distribution on database
        distribution = Distribution.objects.create(
          distribution_id=row_values[1],
          release_date = release_date
          )
        varyant_url = f'https://www.apkmirror.com/apk/instagram/instagram-instagram/instagram-instagram-{row_values[1]}-release/'
        varyant_soup = url_to_text(varyant_url) # get html as bs4
        # get rows of main div
        varyant_rows = varyant_soup \
          .find_all('div', class_='listWidget')[0] \
          .find('div', class_='table topmargin variants-table') \
          .find_all('div', class_='table-row')[1:]
        # loop for each row
        for _varyant_row in varyant_rows:
          varyant_row_array = _varyant_row.get_text().split()
          # Create varyant
          varyant = Varyant.objects.create(
            distribution = distribution,
            varyant_id = varyant_row_array[-8],
            architecture = varyant_row_array[-4],
            min_version = " ".join(map(str, varyant_row_array[-3:-1])),
            dpi = varyant_row_array[-1],
          )

      else:
        break
    number += 1