import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export default function Index() {
  const liveStreams = [
    {
      id: 1,
      title: "Чемпионат мира по шахматам 2024",
      description: "Финальная партия: Карлсен vs Непомнящий",
      viewers: 15420,
      status: "live",
      duration: "2:34:15"
    },
    {
      id: 2,
      title: "Гран-при ФИДЕ",
      description: "Полуфинал турнира претендентов",
      viewers: 8750,
      status: "live", 
      duration: "1:12:45"
    },
    {
      id: 3,
      title: "Командный чемпионат Европы",
      description: "Россия vs Франция - решающий матч",
      viewers: 12300,
      status: "scheduled",
      duration: "Начнется в 18:00"
    }
  ];

  const tournaments = [
    {
      id: 1,
      name: "Мемориал Таля 2024",
      date: "15-25 декабря",
      location: "Рига, Латвия",
      prize: "$50,000",
      status: "ongoing"
    },
    {
      id: 2,
      name: "Супертурнир Вейк-ан-Зее",
      date: "12-28 января 2025",
      location: "Нидерланды",
      prize: "$100,000",
      status: "upcoming"
    },
    {
      id: 3,
      name: "Чемпионат России",
      date: "1-15 февраля 2025",
      location: "Сочи, Россия",
      prize: "$30,000",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Icon name="Crown" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground" style={{fontFamily: 'Times New Roman, serif'}}>
                CHESS STREAMS
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#streams" className="text-foreground hover:text-primary transition-colors font-medium">
                Трансляции
              </a>
              <a href="#tournaments" className="text-foreground hover:text-primary transition-colors font-medium">
                Турниры
              </a>
              <Button variant="outline" size="sm">
                <Icon name="Search" size={16} className="mr-2" />
                Поиск
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Герой блок */}
      <section className="bg-gradient-to-b from-chess-light to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <Icon name="Zap" size={40} className="text-chess-dark" />
              <span className="text-sm font-medium text-chess-accent bg-chess-dark/10 px-3 py-1 rounded-full">
                LIVE BROADCAST
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-chess-dark mb-6" style={{fontFamily: 'Times New Roman, serif'}}>
            Шахматные<br />Трансляции
          </h1>
          
          <p className="text-xl text-chess-accent max-w-2xl mx-auto mb-8" style={{fontFamily: 'Arial, sans-serif'}}>
            Следите за лучшими турнирами мира в режиме реального времени. 
            Профессиональные комментарии, анализ партий и интерактивные доски.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-chess-dark hover:bg-chess-black text-chess-light">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть сейчас
            </Button>
            <Button variant="outline" size="lg" className="border-chess-dark text-chess-dark hover:bg-chess-dark hover:text-chess-light">
              <Icon name="Calendar" size={20} className="mr-2" />
              Расписание
            </Button>
          </div>
        </div>
      </section>

      {/* Живые трансляции */}
      <section id="streams" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2" style={{fontFamily: 'Times New Roman, serif'}}>
                Прямые трансляции
              </h2>
              <p className="text-muted-foreground">Смотрите партии величайших мастеров</p>
            </div>
            <Button variant="outline">
              <Icon name="Filter" size={16} className="mr-2" />
              Фильтры
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="group hover:shadow-lg transition-all duration-300 border-chess-accent/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={stream.status === 'live' ? 'default' : 'secondary'}
                      className={stream.status === 'live' ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                      {stream.status === 'live' ? (
                        <>
                          <Icon name="Radio" size={12} className="mr-1" />
                          В ЭФИРЕ
                        </>
                      ) : (
                        <>
                          <Icon name="Clock" size={12} className="mr-1" />
                          ЗАПЛАНИРОВАНО
                        </>
                      )}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Users" size={14} className="mr-1" />
                      {stream.viewers.toLocaleString()}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight" style={{fontFamily: 'Times New Roman, serif'}}>
                    {stream.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {stream.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Timer" size={14} className="mr-1" />
                      {stream.duration}
                    </div>
                    <Button size="sm" className="group-hover:bg-chess-dark group-hover:text-chess-light transition-colors">
                      {stream.status === 'live' ? 'Смотреть' : 'Напомнить'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Турниры */}
      <section id="tournaments" className="py-16 bg-chess-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{fontFamily: 'Times New Roman, serif'}}>
              Турниры
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Следите за расписанием крупнейших турниров и не пропустите важные партии
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <Card key={tournament.id} className="bg-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={tournament.status === 'ongoing' ? 'default' : 'secondary'}>
                      {tournament.status === 'ongoing' ? 'Идет сейчас' : 'Предстоящий'}
                    </Badge>
                    <Icon name="Trophy" size={20} className="text-chess-accent" />
                  </div>
                  
                  <CardTitle className="text-xl" style={{fontFamily: 'Times New Roman, serif'}}>
                    {tournament.name}
                  </CardTitle>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-2" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-2" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center">
                      <Icon name="DollarSign" size={14} className="mr-2" />
                      Призовой фонд {tournament.prize}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-chess-dark text-chess-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Crown" size={28} className="text-chess-light" />
                <h3 className="text-xl font-bold" style={{fontFamily: 'Times New Roman, serif'}}>
                  CHESS STREAMS
                </h3>
              </div>
              <p className="text-chess-light/80 mb-4">
                Ваш надежный источник прямых трансляций шахматных турниров 
                с профессиональными комментариями и анализом.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-chess-light hover:bg-chess-light hover:text-chess-dark">
                  <Icon name="Youtube" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-chess-light hover:bg-chess-light hover:text-chess-dark">
                  <Icon name="Twitter" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-chess-light hover:bg-chess-light hover:text-chess-dark">
                  <Icon name="Facebook" size={16} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-chess-light/80">
                <li><a href="#" className="hover:text-chess-light transition-colors">Трансляции</a></li>
                <li><a href="#" className="hover:text-chess-light transition-colors">Турниры</a></li>
                <li><a href="#" className="hover:text-chess-light transition-colors">Архив</a></li>
                <li><a href="#" className="hover:text-chess-light transition-colors">Новости</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-chess-light/80">
                <li><a href="#" className="hover:text-chess-light transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-chess-light transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-chess-light transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-chess-light transition-colors">Политика</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-chess-light/20 mt-8 pt-8 text-center text-chess-light/60">
            <p>&copy; 2024 Chess Streams. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}